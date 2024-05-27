import { SchemaTypeDefinition } from "sanity";
import { UserIcon } from "@sanity/icons";

const userDetails: SchemaTypeDefinition = {
  name: "userDetails",
  type: "document",
  title: "User Details",
  icon: UserIcon,
  description: "desc",
  fields: [
    {
      name: "userId",
      type: "reference",
      title: "User Id",
      to: [{ type: "user" }],
    },
    {
      name: "name",
      type: "string",
      title: "Username",
    },
  ],
};

export default userDetails;
