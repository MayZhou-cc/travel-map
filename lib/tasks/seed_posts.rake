task seed_jobs: :environment do

  Post.create(
      title: 'Brisbane',
      description: 'Lovely Lovely place'
  )

  Post.create(
      title: 'Brisbane museum MoB',
      description: 'Bringing Our Vibrant Art, Culture & History To Life. '
  )

  puts 'complete'
end