class Photo < ApplicationRecord
validates :url, uniqueness: { case_sensitive: false }
after_commit :flush_cache


def self.all_cached
    Rails.cache.fetch("photos") { Photo.all }
end

end

private

def flush_cache
  Rails.cache.delete('photos')
end