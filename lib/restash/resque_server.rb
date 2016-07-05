require 'resque/server'
require 'json'

module Restash
  module ResqueServer
    def self.included(base)
      base.class_eval do

        get '/restash/ping' do
          { status: :ok }.to_json
        end

        post '/restash/retry' do
          p = JSON.parse(request.body.read)
          queue = p['queue']
          klass = p['payload']['class']
          args = p['payload']['args']
          success = false
          enqueue = :not_enqueued
          begin
            success = Resque.enqueue_to(queue, klass.constantize, *args)
            enqueue = :with_resque_enqueue_to
          rescue NoMethodError => e
            Resque.push(queue, :class => klass.to_s, :args => args)
            success = true
            enqueue = :with_resque_push
          end
          { success: success, enqueue: enqueue }.to_json
        end
      end
    end
  end
end

Resque::Server.class_eval do
  include Restash::ResqueServer
end
