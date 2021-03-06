require 'rubygems'
BOTS = %w(Rage Bully Prospector Dual)
MAPS = 1..100

def parse_results(output)
  output = output.split("\n")
  loss = (output[-1] =~ /Player 1 Wins/).nil?
  turns = output[-2].split[1]
  [!loss, turns.to_i]
end

def print_results(victory, turns)
  print victory ? "W" : "L"
  print "(#{turns}) "
  STDOUT.flush
end

def play_game(map, challenger)
  my_cmd = 'node MyBot.js'
  opp_cmd = "java -jar example_bots/#{challenger}Bot.jar"

  cmd = %Q{java -jar tools/PlayGame-1.2.jar maps/map#{map}.txt 1000 200 log.txt "#{my_cmd}" "#{opp_cmd}"}
  `#{cmd} 2> commentary.txt > video.txt`
  parse_results(File.read('commentary.txt'))
end

desc "Play one game. Set ENV vars MAP and BOT."
task :play do
  map = ENV['MAP'] || 22
  bot = ENV['BOT'] || 'Prospector'
  print_results *play_game(map, bot)
  puts
end

desc "Watch last game."
task :watch do
  `cat video.txt | java -jar tools/ShowGame-1.2.jar`
end

desc "Play your bot against all bots on all maps"
task :tournament do
  BOTS.each do |bot|
    wins = losses = turns_sum = 0
    print "Challenging #{bot}Bot: "
    MAPS.each do |map|
      victory, turns = play_game map, bot
      victory ? wins += 1 : losses +=1
      turns_sum += turns
      print (victory ? 'W' : 'L')
      STDOUT.flush
    end
    puts "  #{wins}-#{losses} (avg #{turns_sum/(wins+losses)} turns)"
  end
end

desc "Info on available bots and maps"
task :help do
  puts "Available bots: #{BOTS.join(',')}"
  puts "Available maps: #{MAPS.inspect}"
end

task :one do
  puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 200 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js" | java -jar tools/ShowGame-1.2.jar`
  # puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 200 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js"`
end

task :vs do
  puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 200 log.txt "node ../pws/MyBot.js" "node MyBot.js" | java -jar tools/ShowGame-1.2.jar`
  # puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 200 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js"`
end

task :profile do
  puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 5000 200 log.txt "java -jar example_bots/ProspectorBot.jar" "node --prof MyBot.js"`
end

desc "mutate existing networks"
task :mutate do
  Mutations.create_mutations
end

desc "mutate and run a round, deleting the losing networks"
task :run do
  run_times = (ENV['MUTATIONS'] || 1).to_i
  p "running #{run_times} times"
  run_times.times do
    p "*" * 80
    p `date`
    p `git pull`
    Rake::Task["compile"].execute
    Rake::Task["mutate"].execute
    Rake::Task["matchup"].execute
    p `git add -A`
    Rake::Task["tcp"].execute
  end
end

task :default => :run

desc "run a tcp server match"
task :tcp do
  name = ENV['NAME'] || "phillc"
  run_tcp = Thread.new do
    puts `./tcp 104.200.23.59 995 #{name} -p 1 tcprunbot.sh`
  end
  run_tcp.join(5 * 60)
end

desc "run a round, deleting the losing networks"
task :matchup do
  Mutations.matchup
end

task :compile do
  `rm -rf compiled/*`
  `mkdir compiled`
  Dir["*.js"].each do |filename|
    command = "java -jar compiler.jar --js=#{filename} --js_output_file=compiled/#{filename}"
    puts command
    puts `#{command}`
  end
end

task :make do
  Rake::Task["compile"].execute
  `rm -rf staging/*`
  `mkdir -p staging/contest_package`
  `cp compiled/*.js staging/contest_package`
  `cd staging && zip -r contest_package.zip contest_package && rm -rf contest_package`
end

require 'json'
module Mutations
  KEEP_MUTATIONS = 15
  RUN_MUTATIONS = 30
  NUMBER_OF_MATCHES = 8
  
  def self.create_mutations
    RUN_MUTATIONS.times { Mutations::CreatedMutation.create_random } if filenames.empty?
    if filenames.length < RUN_MUTATIONS
      get_and_increment("mutations/count")
      existing_mutations.each{ |m| m.mutate } 
      Mutations::CreatedMutation.create_random
    end
    create_mutations if filenames.length < RUN_MUTATIONS
  end
  
  def self.matchup
    file_records = {}
    p filenames.sort
    filenames.sort.each do |filename|
      p "*" * 80
      my_command = "node compiled/MyBot.js ../#{filename}"
      
      possible_opponents = filenames.sort_by { rand }
      possible_opponents.delete(filename)
      
      NUMBER_OF_MATCHES.times do
        map = rand(MAPS.end) + 1
        challenger = possible_opponents.shift
        challenger_command = "node compiled/MyBot.js ../#{challenger}"
        cmd = %Q{java -jar tools/PlayGame-1.2.jar maps/map#{map}.txt 1000 200 log.txt '#{my_command}' '#{challenger_command}' 2>&1}
        p "running #{cmd}"
        output = `#{cmd}`.split("\n")
        file_records[filename] ||= 0
        file_records[challenger] ||= 0
        
        if output.any?{ |line| line =~ /timed out|crashed/ }
          puts output.join("\n")
          raise "Problem!!!"
        end
        
        if output[-2] =~ /Player 1 Wins/
          p "#{filename} wins in #{output[-3].split[1]} turns"
          file_records[filename] = file_records[filename] + 2
          file_records[challenger] = file_records[challenger] -0.25
        elsif output[-2] =~ /Draw/
          p "#{filename} drawed in #{output[-3].split[1]} turns"
          file_records[filename] = file_records[filename] + 1
          file_records[challenger] = file_records[challenger] + 0.25
        elsif output[-2] =~ /Player 2 Wins/
          p "#{filename} lost in #{output[-3].split[1]} turns"
          file_records[filename] = file_records[filename] - 1
          file_records[challenger] = file_records[challenger] + 0.5
        else
          p output[-2]
          raise "if none won, lost, or draw, wtf is it?"
        end
      end
    end
    
    file_records.sort_by {|filename, wins| wins}.reverse.each_with_index do |(filename, wins), index|
      `cp #{filename} weights.js` if index == 0
      if index < KEEP_MUTATIONS
        p "keeping mutation #{filename} which has #{wins} points"
      else
        p "deleting mutation #{filename} which only had #{wins} points"
        File.delete filename
      end
    end
    
  end
  
  def self.filenames
    Dir["mutations/mutation*.js"]
  end
  
  def self.existing_mutations
    filenames.map{ |filename| ExistingMutation.new(filename) }
  end
      
  def self.get_and_increment file
    number = File.read(file).chomp.to_i + 1
    File.open(file, "w"){ |f| f.write number }
    number
  end

  class Mutation
    attr_reader :network_weights
    JS_IFY = "exports.weights = "
    BASE_FILENAME = "mutation"
    
    def self.defined_networks
      @defined_networks ||= JSON.parse(`node utils/printNetworkInfo.js`)["networks"]
    end
    
    def next_number!
      Mutations.get_and_increment("mutations/number")
    end
        
    def filename
      "mutations/#{BASE_FILENAME}#{@network_number}.js"
    end
    
    def mutate
      if rand(30) > 1
        CreatedMutation.create_from @network_weights
      else
        existing = Mutations.existing_mutations
        CreatedMutation.create_crossbreed @network_weights, existing[rand(existing.size)].network_weights
      end
    end
  end
  
  class ExistingMutation < Mutation
    def initialize filename
      @network_number = File.basename(filename, ".js").sub(BASE_FILENAME, "")
      @network_weights = read
    end
    
    protected
    
    def read
      JSON.parse(File.read(filename).sub(JS_IFY, ""))
    end
  end
    
  class CreatedMutation < Mutation
    def self.create_random
      weights = {}
      
      defined_networks.each do |network_name, info|
        hidden_layer_number = info["hiddenLayer"].to_i
        inputs = info["inputs"]
        
        input_weights = []
        hidden_layer_number.times do
          input_weights.push(randomize_inputs(inputs))
        end
        
        hidden_weights = []
        hidden_layer_number.times do
          hidden_weights.push(random_input_value)
        end
        
        weights[network_name] = { :input_weights => input_weights,
                                  :hidden_weights => hidden_weights }
      end
      weights[:created_on] = Time.now
      weights[:created_by] = "Random"
      m = new weights
      m.store
    end
    
    def self.create_from mutation_weights
      weights = {}
      defined_networks.each do |network_name, info|
        hidden_layer_number = info["hiddenLayer"].to_i
        inputs = info["inputs"]
        
        input_weights = []
        hidden_layer_number.times do |num|
          input_weights.push(mutate_inputs(inputs, (mutation_weights[network_name] && mutation_weights[network_name]["input_weights"][num]) || {} ))
        end
        
        hidden_weights = []
        hidden_layer_number.times do |num|
          hidden_weights.push(mutate_input_value(mutation_weights[network_name] && mutation_weights[network_name]["hidden_weights"][num]))
        end
        
        weights[network_name] = { :input_weights => input_weights,
                                  :hidden_weights => hidden_weights }
      end
      
      weights[:created_on] = Time.now
      weights[:created_by] = "mutation"
      m = new weights
      m.store
    end
    
    def self.create_crossbreed mutation_weights1, mutation_weights2 
      weights1 = {}
      weights2 = {}
      defined_networks.each do |network_name, info|
        hidden_layer_number = info["hiddenLayer"].to_i
        inputs = info["inputs"]
        
        input_weights1 = []
        input_weights2 = []
        hidden_layer_number.times do |num|
          old_weights1 = (mutation_weights1[network_name] && mutation_weights1[network_name]["input_weights"][num]) || {}
          old_weights2 = (mutation_weights2[network_name] && mutation_weights2[network_name]["input_weights"][num]) || {}
          input_weights1.push(old_weights1)
          input_weights2.push(old_weights2)
        end
        
        hidden_weights1 = []
        hidden_weights2 = []
        hidden_layer_number.times do |num|
          old_weight1 = (mutation_weights1[network_name] && mutation_weights1[network_name]["hidden_weights"][num]) || 0
          old_weight2 = (mutation_weights2[network_name] && mutation_weights2[network_name]["hidden_weights"][num]) || 0
          hidden_weights1.push(old_weight1)
          hidden_weights2.push(old_weight2)
        end
        
        hidden_layer_number.times do
          first = rand(hidden_layer_number)
          second = rand(hidden_layer_number)
          
          copy = Hash[input_weights1[first]]
          input_weights1[first] = input_weights2[second]
          input_weights2[second] = copy
          
          copy = hidden_weights1[first]
          hidden_weights1[first] = hidden_weights2[second]
          hidden_weights2[second] = copy
        end
        
        weights1[network_name] = { :input_weights => input_weights1,
                                   :hidden_weights => hidden_weights1 }
        weights2[network_name] = { :input_weights => input_weights2,
                                   :hidden_weights => hidden_weights2 }
      end
      
      weights1[:created_on] = Time.now
      weights1[:created_by] = "Crossbreed"
      weights2[:created_on] = Time.now
      weights2[:created_by] = "Crossbreed"
      
      m1 = new weights1
      m1.store
      m2 = new weights2
      m2.store
    end
      
    def self.randomize_inputs inputs
      weights = inputs.inject({}) do |memo, input_name|
        memo[input_name] = random_input_value
        memo
      end
      weights
    end
    
    def self.random_input_value
      0.5 - rand
    end
    
    def self.mutate_inputs inputs, original_values
      weights = inputs.inject({}) do |memo, input_name|
        memo[input_name] = mutate_input_value(original_values[input_name])
        memo
      end
      weights
    end
    
    def self.mutate_input_value original_value
      original_value ||= 0
      case rand(8)
        when 0..1 then original_value / 2.0
        when 2..3 then original_value * 2.0
        when 4 then original_value * -1
        when 5 then original_value + 0.1
        when 6 then original_value - 0.1
        when 7 then original_value
      end
    end
    
    def initialize weights
      @network_number = self.next_number!
      @network_weights = weights
    end
    
    def store
      unless File.exists? filename
        File.open(filename, 'w') { |f| f.write(JS_IFY + JSON.pretty_generate(@network_weights)) }
      end
    end
  end
end
