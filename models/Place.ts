import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPlace extends Document {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  reward: string; 
}

const PlaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: true },
  reward: { type: String, required: true }
});

const Place: Model<IPlace> = mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);

export default Place;
