require 'resque/failure/base'
require 'restash/conf'

module Resque
  module Failure
    class Logstash < Base

      def save
        begin
          message = { exception: exception.to_s,
                      exception_class: exception.class.to_s,
                      backtrace: exception.backtrace,
                      worker: worker.to_s,
                      queue: queue,
                      payload: payload,
                      tags: [:resque_failure] }
          Restash::Conf.message_mutator.call(message) if Restash::Conf.message_mutator
          message.merge! Restash::Conf.extra_options
          Restash::Conf.logger.write(message.to_json)
        rescue => e
          puts "Failed to send to logstash: #{e.message}\n#{e.backtrace}"
        end

      end

    end
  end
end