require 'tcp_timeout'

module Restash
  class Logger

    def initialize(host, port, options)
      @host = host
      @port = port
      @options = options
    end

    def write(data)
      sock = TCPTimeout::TCPSocket.new(@host, @port, @options)
      sock.write(data)
      sock.close
    end

  end
end

