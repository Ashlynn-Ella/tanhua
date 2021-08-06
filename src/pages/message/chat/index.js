import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { GiftedChat, Bubble, Send, Actions, InputToolbar, MessageImage } from 'react-native-gifted-chat'
import { useMy } from '../../../context/my-context'
import { BASE_URI } from '../../../utils/path-map'
import JMessage from '../../../utils/JMessage'
import { THNav } from '../../../component/tanhua-nav'
import { launchImageLibrary } from 'react-native-image-picker'

const renderSend = (props) => {
  return (
    <Send
      {...props}
      alwaysShowSend={true}
    >
      <View style={styles.sendBtn}>
        <Text style={{ color: '#ffffff', fontSize: 17 }}>发送</Text>
      </View>
    </Send>
  );
};
const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: 'black',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#fff',
        },
        right: {
          backgroundColor: '#95ec69',
        },
      }}
    />
  );
};
const renderMessageImage = (props) => {
  return (
    <MessageImage
      {...props}
      containerStyle={{
        backgroundColor: 'transparent'
      }}
    />
  )
}
const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#222B45',
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
)
export const Chat = (props) => {
  // console.log(props.route.params)
  const { my } = useMy()
  const [messages, setMessages] = useState([])
  const userParams = props.route.params
  useEffect(async () => {
    getMessages()
  }, [])
  const getMessages = async () => {
    const historys = await JMessage.getHistoryMessages(userParams.guid, 1, 100)
    let messages = []
    historys.forEach((ele) => {
      const from = ele.from
      const avatar = from.username === my.guid ? my.header : userParams.header
      let messgae = {
        _id: ele.id,
        text: ele.text,
        createdAt: ele.createTime,
        user: {
          _id: from.username,
          name: from.nick_name,
          avatar: BASE_URI + avatar,
        },
      }
      messages.push(messgae)
    });
    setMessages(messages.reverse())
  }
  const onSend = useCallback((messages = []) => {
    sendMessage(messages[0])
    // console.log(messages[0])
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  const sendMessage = async (message) => {
    console.log(message)
    const guid = userParams.guid
    const extras = { user: JSON.stringify(my) }
    if (message.text) {
      const text = message.text
      const resText = await JMessage.sendTextMessage(guid, text, extras)
      console.log(resText)
    } else {
      const path = message.image
      const resImage = await JMessage.sendImageMessage(guid, path, extras)
      console.log(resImage)
    }
  }
  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={{
            uri: 'https://placeimg.com/32/32/any',
          }}
        />
      )}
      options={{
        '选择图片': () => {
          launchImageLibrary({
            mediaType: 'photo',
          }, (res) => {
            // console.log(res)
            const url = res.assets[0].uri
            const id = res.assets[0].fileName.replace('.png', '')
            const message = {
              _id: id,
              createdAt: new Date(),
              image: url,
              user: {
                _id: my.guid,
                name: my.nick_name,
                avatar: BASE_URI + my.header,
              },
            }
            onSend([message])
          })
        },
        '取消': () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <THNav title={userParams.nick_name} />
      <GiftedChat
        messages={messages}
        locale={'zh-cn'}
        showAvatarForEveryMessage={true}
        renderActions={renderActions}
        showUserAvatar={true}
        placeholder={'开始聊天吧'}
        renderSend={renderSend}
        onSend={onSend}
        inverted={true}
        renderBubble={renderBubble}
        dateFormat={'MM-DD HH:mm'}
        renderUsernameOnMessage={false}
        renderMessageImage={renderMessageImage}
        user={{
          _id: my.guid,
          name: my.nick_name,
          avatar: BASE_URI + my.header,
        }}
        alignTop={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    backgroundColor: '#07c160',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  }
})
