import { connectToDatabase } from '../../../lib/mongodb';
import Place from '../../../models/Place';

export async function GET() {
  try {
    await connectToDatabase();
    const places = await Place.find({});
    return new Response(JSON.stringify(places), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch places', error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, latitude, longitude, description, reward, image } = await request.json();
    const newPlace = new Place({ name, latitude, longitude, description, reward, image });
    await newPlace.save();
    return new Response(JSON.stringify({ place: newPlace }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to add place', error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
