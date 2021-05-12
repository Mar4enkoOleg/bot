import { Request, Response } from 'express';
import dialogflow from '@google-cloud/dialogflow';
import { google } from '@google-cloud/dialogflow/build/protos/protos';
import Res from '../../helpers/Response';
import Logger from '../../config/winston_config';

export const intentsClient = new dialogflow.IntentsClient();

const intentsPrint = (
  intentList: google.cloud.dialogflow.v2.IIntent[]
): void => {
  intentList.forEach((intent) => {
    console.log('====================');
    console.log(`Intent name: ${intent.name}`);
    console.log(`Intent display name: ${intent.displayName}`);
    console.log(`Action: ${intent.action}`);
    console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
    console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

    console.log('Input contexts:');
    intent.inputContextNames!.forEach((inputContextName) => {
      console.log(`\tName: ${inputContextName}`);
    });

    console.log('Output contexts:');
    intent.outputContexts!.forEach((outputContext) => {
      console.log(`\tName: ${outputContext.name}`);
    });
  });
};

export const listIntents = async (): Promise<
  google.cloud.dialogflow.v2.IIntent[]
> => {
  // Construct request

  // The path to identify the agent that owns the intents.
  const projectId = process.env.DF_PROJECT || 'botan-lpnu-tbdx';
  Logger.info(`DialogFlow project ID is ${projectId}`);

  const projectAgentPath = intentsClient.agentPath(projectId);
  Logger.info(`DialogFlow projectAgentPath is ${projectAgentPath}`);
  // console.log(projectAgentPath);

  const request = {
    parent: projectAgentPath,
  };

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  return response;
};

export const getlistIntents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const intentsList = await listIntents();

  if (!intentsList.length) {
    return Res.BadRequest(res, 'There are no intents');
  }

  intentsPrint(intentsList);

  return Res.Success(res, intentsList);
};
