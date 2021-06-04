class ReivewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airline_id

  # belongs_to :airline
end
