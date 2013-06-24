task :environment do
  unless $project = ENV['PROJECT']
    puts "No project specified"
    exit(1)
  end
end

desc 'build extension'
task :build => :environment do
  key = ENV['KEY'] || "key.pem"

  command = "rm #{$project}.crx"
  puts command
  `#{command}`

  command = %{/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --pack-extension=#{$project} --pack-extension-key=#{key}}
  puts command
  `#{command}`
end

task :publish => :environment do
  require 'yaml'
  require 'aws-sdk'
  amazon_config = YAML.load_file(File.expand_path(".amazon.yml", "~"))
  AWS.config(
    access_key_id: amazon_config["access_key_id"],
    secret_access_key: amazon_config["secret_access_key"]
  )
  file = "#{$project}.crx"
  puts "pushing #{file} to s3"
  s3 = AWS::S3.new
  bucket = s3.buckets['media.chingr.com']
  bucket.objects["extensions/#{file}"].write(file: file, acl: :public_read, content_type: "application/x-chrome-extension")
end

task :release => [:build, :publish]

task :default => :build
