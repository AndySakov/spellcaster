import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import neynarClient from "./neynarClient";
import { FARCASTER_BOT_MNEMONIC, NEYNAR_API_KEY, SIGNER_UUID } from "./config";
import { EmbeddedCast } from "@neynar/nodejs-sdk/build/neynar-api/v2";

// Validating necessary environment variables or configurations.
if (!FARCASTER_BOT_MNEMONIC) {
  throw new Error("FARCASTER_BOT_MNEMONIC is not defined");
}
if (!SIGNER_UUID) {
  throw new Error("SIGNER_UUID is not defined");
}

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is not defined");
}

/**
 * Function to publish a message (cast) using neynarClient.
 * @param msg - The message to be published.
 */
const publishCast = async (args: {
  msg: string;
  options?:
    | {
        embeds?: EmbeddedCast[] | undefined;
        replyTo?: string | undefined;
        channelId?: string | undefined;
      }
    | undefined;
}) => {
  try {
    const { msg, options } = args;
    // Using the neynarClient to publish the cast.
    await neynarClient.publishCast(SIGNER_UUID, msg, options);
    console.log("Cast published successfully");
  } catch (err) {
    // Error handling, checking if it's an API response error.
    if (isApiErrorResponse(err)) {
      console.error(err.response.data);
    } else console.error(err);
  }
};

publishCast({
  msg: "Henlo World!",
  // options: {
  // channelId: ""
  // embeds: [{ cast_id: "", url: "" }],
  // },
});
