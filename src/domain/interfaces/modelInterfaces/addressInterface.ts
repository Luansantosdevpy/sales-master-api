import { Document } from "mongoose";

export default interface AddressInterface extends Document{
address: string;
postal_code: string;
address_number?: number;
complement: string;
province: string;
city: string;
uf: string;   
}