class TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: tasks
  end

  def create
    task = Task.create(task_params)
    head :created
  end

  def destoryTaskById
    task = Task.find(params[:id])
    task.destroy
    head :ok
  end

  private

  def task_params
    params.permit(:name, :is_done)
  end
end
