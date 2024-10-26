"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { Mistral } from '@mistralai/mistralai';
import 'material-icons/iconfont/material-icons.css';
const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

interface Messages {
  echange: {
    user: string;
    IA: string;
  };
}


const AIChat = () => {
  const [messages, setMessages] = useState<Messages[]>([])
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<ReactNode>(
    <button className='absolute w-32 h-28 right-10 bottom-10 ' onClick={() => { setIsDialog(!isDialog); }}>
      <i className='material-icons opacity-70 text-custom text-6xl'>message</i>
    </button>
  )
  const sendToApi = async (formData: FormData) => {
    const client = new Mistral({ apiKey: apiKey });
    const result = await client.chat.stream({
      model: "mistral-small-latest",
      messages: [{ role: 'user', content: formData.get('quest') as string }],
    });
    const temp = messages.concat([
      {
        echange: {
          user: formData.get('quest') as string,
          IA: ""
        }
      }]
    )
    setMessages(temp)
    for await (const chunk of result) {
      const streamText = chunk.data.choices[0].delta.content;
      setMessages((messages) => {
        return messages.slice(0, -1).concat([
          {
            echange: {
              user: formData.get('quest') as string,
              IA: messages[messages.length - 1].echange.IA + streamText
            }
          }]
        )
      })
    }
    /*
      if (chatResponse.choices && chatResponse.choices.length > 0) {
        console.log(chatResponse.choices[0].message.content);
      } else {
        throw new Error("No choices returned from the API");
      }*/
  }

  useEffect(() => {
    if (!isDialog) {
      setShowDialog(<button className='absolute w-32 h-28 right-10 bottom-10 ' onClick={() => { setIsDialog(!isDialog); }}>
        <i className='material-icons opacity-70 text-custom text-6xl'>message</i>
      </button>)
    }
    else {
      setShowDialog(
        <div className="rounded border justify-between p-4 flex flex-col space-y-3 border-gray-500 border-opacity-60 bg-gray-100 absolute right-10 bottom-10 h-96 w-96">
          <div className="flex flex-row justify-between">
            <p className='font-bold text-custom'>
              AI Assistant
            </p>
            <button onClick={() => { setIsDialog(!isDialog); }}>
              <i className='material-icons opacity-70 text-custom text-3xl'>remove</i>
            </button>
          </div>
          <div className="h-full overflow-y-scroll">
            {
              messages?.map((message: { echange: { user: string; IA: string } }, index: number) =>
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex justify-end ">
                    <p className='text-right rounded my-bg-opacity p-2'>{message.echange.user}</p>
                  </div>
                  <div className="flex justify-start  ">
                    <p className='text-left p-2 bg-green-200 rounded'>{message.echange.IA}</p>
                  </div>
                </div>
              )
            }
          </div>
          <form className="flex flex-row">
            <input type="text" name="quest" id="quest" className='p-2 w-full mr-2 h-10 rounded-md border border-gray-400' />
            <button formAction={(formData: FormData) => { sendToApi(formData) }}>
              <i className='material-icons opacity-70 text-opacity-100 text-custom text-3xl'>send</i>
            </button>
          </form>
        </div>
      )
    }
  }, [isDialog, messages])

  return (
    <>
      {showDialog}

    </>
  )
}

export default AIChat