# Restash
[![Build Status](https://travis-ci.org/YotpoLtd/restash.svg?branch=master)](https://travis-ci.org/YotpoLtd/restash)
Log [Resque](https://github.com/resque/resque) failures to [Logstash](https://www.elastic.co/products/logstash)

## Usage

Add to your backend:
```
Resque::Failure::Multiple.classes = [Resque::Failure::Redis, Resque::Failure::Logstash]
Resque::Failure.backend = Resque::Failure::Multiple
```

Configure logstash host and port (currently support only udp)
```
Restash::Conf.configure do |conf|
  conf.logstash_host = ENV['LOGSTASH_HOST']
  conf.logstash_port = ENV['LOGSTASH_PORT']
end
```


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

