BOTS = %w(Bully Dual Prospector Rage Random)
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

task :play do
  map = ENV['MAP'] || 7
  bot = ENV['BOT'] || 'Dual'
  print_results *play_game(map, bot)
  puts
end

task :watch do
  `cat video.txt | java -jar tools/ShowGame.jar`
end

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

task :help do
  puts "Available bots: #{BOTS.join(',')}"
  puts "Available maps: #{MAPS.inspect}"
end

task :default => :tournament