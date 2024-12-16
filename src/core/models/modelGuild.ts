import mongoose, { Schema } from "mongoose";
import { IModelGuild } from "./modelGuild.interface";

const schema: Schema<IModelGuild> = new Schema({
  guildId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  memberCount: { type: Number, required: true },
  color: { type: String, required: true },
  prefix: { type: String, required: true },
  invites: { type: [{ code: String || null, expires: String || null }] },
  channels: {
    pedirset: {
      id: { type: String || null },
      name: { type: String || null },
    },
    aprovarset: {
      id: { type: String || null },
      name: { type: String || null },
    },
    pd: {
      id: { type: String || null },
      name: { type: String || null },
    },
  },
  roles: {
    entry: {
      id: { type: String || null },
      name: { type: String || null },
    },
    aprover: {
      id: { type: String || null },
      name: { type: String || null },
    },
  },
});

export const ModelGuild = mongoose.model("Guild3", schema);
