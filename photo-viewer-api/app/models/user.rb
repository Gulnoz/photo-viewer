class User < ApplicationRecord
    # has_many :photos, dependent: :destroy
    has_secure_password
    validates :email, uniqueness: { case_sensitive: false }
end
