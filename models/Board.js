export default function BoardModel(mongoose) {

  const boardSchema = mongoose.Schema({
    userid: String,
    password: String,
    email: String,
    name: String,
    phone: String,
    birth: String,
    address: String,
    token: String,
  });

  return mongoose.model("Board", boardSchema);
}
