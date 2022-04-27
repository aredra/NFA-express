export default function BoardModel(mongoose) {

  const boardSchema = mongoose.Schema({
    id: number,
    moveNfa: string,
    reportDate: string,
    moveDate: string,
    moveTime: string,
    distance: number,
    arrivalDate: string,
    arrivalTime: string,
    returnDate: string,
    returnTime: string,
    patientGender: string,
    patientAge: number,
    accidentCity: string,
  });

  return mongoose.model("Board", boardSchema);
}
