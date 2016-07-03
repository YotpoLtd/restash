require 'logstash-logger'

module Restash
  class Conf

    class << self

      attr_accessor :logstash_host, :logstash_port

      def configure
        yield self
        true
      end

      def logger
        @logger ||= LogStashLogger.new(logstash_host, logstash_port)
      end

    end

  end
end

require 'restash/resque_server'
