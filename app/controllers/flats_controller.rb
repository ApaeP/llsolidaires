class FlatsController < ApplicationController
  before_action :set_flat, only: [:show, :edit, :update, :destroy]

  def show
    @flat = Flat.find(params[:id])
  end

  def index
    @flats = Flat.geocoded

    @markers = @flats.map do |flat|
      {
        lat: flat.latitude,
        lng: flat.longitude,
        # infoWindow: { content: render_to_string(partial: "/flats/map_box", locals: { flat: flat }) }
      }
    end
  end

  def new
    if current_user
      @user_id = current_user.id
      @flat = Flat.new

    else
      flash[:error] = "Accès interdit -> Vous devez vous inscrire d'abord !"
      redirect_to root_path
    end
  end

  def create
    @flat = Flat.new(flat_params)
    @flat.user_id = current_user.id
    if @flat.save
      redirect_to flat_path(@flat)
    else
      render :new
    end
  end

  def edit

  end

  def update

  end

  def destroy
    @flat.destroy
    redirect_to flats_path
  end

  private

  def set_flat
    @flat = Flat.find(params[:id])
  end

  def flat_params
    params.require(:flat).permit(:address, :flat_type, :description, :accessibility_pmr)
  end
end
