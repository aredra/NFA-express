export default function BoardModel(mongoose) {
  const boardSchema = mongoose.Schema({
    id: Number,
    moveNfa: String,
    reportDate: String,
    moveDate: String,
    moveTime: String,
    distance: Number,
    arrivalDate: String,
    arrivalTime: String,
    returnDate: String,
    returnTime: String,
    patientGender: String,
    patientAge: Number,
    accidentCity: String,
  });

  return mongoose.model("Board", boardSchema);
}
