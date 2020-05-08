class Photo < ApplicationRecord
validates :url, uniqueness: { case_sensitive: false }
after_commit :flush_cache


def self.all_cached
    Rails.cache.fetch("photos") { Photo.all }
end

# def self.max_pages
# (Photo.all.count.to_f/10.0).ceil
# end

end

private

def flush_cache
  Rails.cache.delete('photos')
end