require 'resque/failure/base'
require 'restash/conf'

module Resque
  module Failure
    class Logstash < Base

      def save
        begin
          Restash::Conf.logger.write({ exception: exception.to_s,
                                       backtrace: exception.backtrace,
                                       worker: worker.to_s,
                                       queue: queue,
                                       payload: payload,
                                       tags: [:resque_failure] }.to_json)
        rescue => e
          puts "Failed to send to logstash: #{e.message}\n#{e.backtrace}"
        end

      end

    end
  end
end