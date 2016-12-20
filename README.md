# Restash
[![Build Status](https://travis-ci.org/YotpoLtd/restash.svg?branch=master)](https://travis-ci.org/YotpoLtd/restash)
Log [Resque](https://github.com/resque/resque) failures to [Logstash](https://www.elastic.co/products/logstash)

## Usage

Add to your backend:
```
Resque::Failure::Multiple.classes = [Resque::Failure::Redis, Resque::Failure::Logstash]
Resque::Failure.backend = Resque::Failure::Multiple
```

Configure logstash host and port. Supports only tcp, due to the large payload. A timeout can be passed in the options.
```
Restash::Conf.configure do |conf|
  conf.logstash_host = ENV['LOGSTASH_HOST']
  conf.logstash_port = ENV['LOGSTASH_PORT']
  conf.options = {connect_timeout: timeout1, write_timeout: timeout2, read_timeout: timeout3}
  conf.extra_options[:some_option_key] = :some_option_value
  conf.message_mutator = Proc.new do |message|
    message[:special_line] = message[:backtrace].try(:find) {|line| line.include?('special')}
  end
end
```

Additional options can be explored in the [TCPTimeout](https://github.com/lann/tcp-timeout-ruby) project. The options are passed as is to a new TCPTimeout::TCPSocket object on every message.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

