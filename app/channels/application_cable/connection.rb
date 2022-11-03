module ApplicationCable
  class Connection < ActionCable::Connection::Base
		identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

		def get_secret_key
			"hot dog"
		end

		def decode_token(token)
			JWT.decode(token, get_secret_key)[0]["user_id"]
		end

		def find_verified_user
			token = request.params[:token]
			if verified_user = User.find_by(id: decode_token(token))
				verified_user
			else
				reject_unauthorized_connection
			end
		end
		
  end
end
