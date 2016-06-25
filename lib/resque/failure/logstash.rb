require 'resque/failure/base'
require 'restash/conf'

module Resque
  module Failure
    class Logstash < Base

      def save
        begin
          Restash::Conf.logger.fatal exception: exception.to_s,
                                     failure_line: exception.backtrace[0],
                                     worker: worker.to_s,
                                     queue: queue,
                                     payload: payload
        rescue => e
          puts "Failed to send to logstash: #{e.message}\n#{e.backtrace}"
        end

      end

    end
  end
end