BOTS = %w(Bully Dual Prospector Rage)
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

  cmd = %Q{java -jar tools/PlayGame-1.2.jar maps/map#{map}.txt 1000 1000 log.txt "#{my_cmd}" "#{opp_cmd}"}
  `#{cmd} 2> commentary.txt > video.txt`
  parse_results(File.read('commentary.txt'))
end

desc "Play one game. Set ENV vars MAP and BOT."
task :play do
  map = ENV['MAP'] || 7
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

task :default => :tournament

task :one do
  puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 1000 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js" | java -jar tools/ShowGame-1.2.jar`
  # puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 1000 1000 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js"`
end

desc "mutate existing networks"
task :mutate do
  Mutations.create_mutations
end

require 'json'
module Mutations
  KEEP_MUTATIONS = 15
  RUN_MUTATIONS = 30
  
  def self.create_mutations
    Mutations::CreatedMutation.create_random if filenames.empty?
    filenames.map{ |filename| ExistingMutation.new(filename) }.each{ |m| m.mutate }
    create_mutations if filenames.length < RUN_MUTATIONS
  end
  
  def self.filenames
    Dir["mutations/mutation*.js"]
  end
      
  class Mutation
    JS_IFY = "exports.weights = "
    BASE_FILENAME = "mutation"
    
    def self.defined_networks
      @defined_networks ||= JSON.parse(`node utils/printNetworkInfo.js`)["networks"]
    end
    
    def next_number!
      file = "mutations/number"
      number = File.read(file).chomp.to_i + 1
      File.open(file, "w"){ |f| f.write number }
      number
    end
    
    def filename
      "mutations/#{BASE_FILENAME}#{@network_number}.js"
    end
    
    def mutate# strategy = :random
      # if strategy == :crossover
      CreatedMutation.create_from @network_weights
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
          input_weights.push(mutate_inputs(inputs, mutation_weights[network_name]["input_weights"][num]))
        end
        
        hidden_weights = []
        hidden_layer_number.times do |num|
          hidden_weights.push(mutate_input_value(mutation_weights[network_name]["hidden_weights"][num]))
        end
        
        weights[network_name] = { :input_weights => input_weights,
                                  :hidden_weights => hidden_weights }
      end
      
      weights[:created_on] = Time.now
      m = new weights
      m.store
    end
      
    def self.randomize_inputs inputs
      weights = inputs.inject({}) do |memo, input_name|
        memo[input_name] = random_input_value
        memo
      end
      weights
    end
    
    def self.random_input_value
      -3 + rand(7)
    end
    
    def self.mutate_inputs inputs, original_values
      weights = inputs.inject({}) do |memo, input_name|
        memo[input_name] = mutate_input_value(original_values[input_name])
        memo
      end
      weights
    end
    
    def self.mutate_input_value original_value
      case rand(6)
        when 0..1 then original_value / 2
        when 2..3 then original_value * 2
        when 4 then original_value * -1
        when 5 then original_value
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

desc "run a round, deleting the losing networks"
task :run do
  
end