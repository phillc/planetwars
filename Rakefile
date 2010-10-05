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
  puts `java -jar tools/PlayGame-1.2.jar maps/map7.txt 200 200 log.txt "java -jar example_bots/ProspectorBot.jar" "node MyBot.js" | java -jar tools/ShowGame-1.2.jar`
end

NUMBER_OF_MUTATIONS = 5
desc "create default set of mutations"
task :create_neuron_templates do
  require 'json'
  networks = JSON.parse(`node utils/printNetworkInfo.js`)["networks"]
  
  NUMBER_OF_MUTATIONS.times do |mutation_number|
    filename = "mutations/weights#{mutation_number}.json"
    unless File.exists?(filename)
      networks = JSON.parse(`node utils/printNetworkInfo.js`)["networks"]
      
      network_weights = {}
      
      networks.each do |network_name, info|
        hidden_layer_number = info["hiddenLayer"].to_i
        inputs = info["inputs"]
        
        input_weights = []
        hidden_layer_number.times do
          input_weights.push(create_random_weights(inputs))
        end
        
        hidden_weights = []
        hidden_layer_number.times do
          hidden_weights.push(-3 + rand(7))
        end
        
        network_weights[network_name] = { :input_weights => input_weights,
                                          :hidden_weights => hidden_weights }
      end
      
      File.open(filename, 'w') {|f| f.write(JSON.pretty_generate(network_weights)) }
    end
  end
end

def create_random_weights inputs
  weights = inputs.inject({}) do |memo, input_name|
    memo[input_name] = -3 + rand(7)
    memo
  end
  weights
end

desc "mutate existing mutations"
task :mutate do
  
end