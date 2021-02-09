import { Model, model, Schema, Document } from "mongoose";

// interface IProducto{
//   name:String,
//   cantidad: Number
// }

// interface IExample{
//   name: String,
//   fecha: Date,
//   productos:IProducto
// }

export interface IExample {
  name: string;
  fecha: Date;
  productos: [
    {
      name: string;
      cantidad: number;
    }
  ];
}

const ExampleModel = new Schema({
  name: String,
  fecha: Date,
  productos: [
    {
      name: String,
      cantidad: Number,
    },
  ],
});

interface IExampleModel extends IExample, Document {}

export const Example = model<IExampleModel>("Example", ExampleModel);
