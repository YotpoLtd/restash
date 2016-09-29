require 'restash/logger'

module Restash
  class Conf

    class << self

      attr_accessor :logstash_host, :logstash_port, :options, :extra_options

      def configure
        self.extra_options = {}
        yield self
        true
      end

      def logger
        @logger ||= Restash::Logger.new(logstash_host, logstash_port, options)
      end

    end

  end
end

require 'restash/resque_server'
