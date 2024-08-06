class User < ApplicationRecord
  has_many :sessions
  has_many :tweets

  validates :username, presence: true, length: { minimum: 3, maximum: 64 }, uniqueness: { message: 'is already taken' }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }
  validates :email, presence: true, length: { minimum: 5, maximum: 500 }, uniqueness: { message: 'is already taken' }

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(password)
  end
end
