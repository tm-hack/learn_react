Rails.application.routes.draw do
  get "tasks" => "tasks#index"
  post "tasks" => "tasks#create"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
