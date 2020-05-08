class User < ApplicationRecord
    has_secure_password
    validates :name, :email, presence: true
    validates :email, uniqueness: { case_sensitive: false }
end
