require 'resque/server'
require 'json'

module Restash
  module ResqueServer
    def self.included(base)
      base.class_eval do

        get "/restash/ping" do
          { status: :ok }.to_json
        end

        post "/restash/retry" do
          p = JSON.parse(request.body.read)
          success = Resque.enqueue_to(p['queue'], p['payload']['class'].constantize, *p['payload']['args'])
          { success: success }.to_json
        end
      end
    end
  end
end

Resque::Server.class_eval do
  include Restash::ResqueServer
end
