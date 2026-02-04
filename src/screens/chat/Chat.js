import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import {
  Black,
  Blue,
  ButtonClr,
  Feather,
  Grey,
  H,
  Ionicons,
  W,
  White,
} from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import {
  chat,
  getChatByID,
  sendMessageByID,
  send_message,
} from "../../api/support";

const Chat = (props) => {
  const { goBack } = props?.navigation;
  const { user } = useContext(AppContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
  const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
    // Force re-render the whole screen when keyboard hides
    setRerenderKey(prev => prev + 1);
  });

    return () => keyboardDidHideListener.remove();
  }, []);

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    try {
      if (props?.route?.params?.item?.id) {
        const chatRes = await getChatByID(
          user?.token,
          props?.route?.params?.item?.customer_id?.id,
          props?.route?.params?.item?.id
        );
        setMessages(chatRes?.data || []);
      } else {
        const chatRes = await chat(user?.token);
        setMessages(chatRes?.data || []);
      }
    } catch (err) {
      console.log("Error getting chat:", err);
    }
  };

  const sendChat = async () => {
    if (!text.trim()) return;

    try {
      if (props?.route?.params?.item?.id) {
        const data = {
          ticket_id: props?.route?.params?.item?.id,
          member_id: props?.route?.params?.item?.customer_id?.id,
          message: text,
        };
        await sendMessageByID(user?.token, data);
      } else {
        const data = {
          receiver_id: 1,
          message: text,
        };
        await send_message(user?.token, data);
      }

      setMessages((prev) => [...prev, { message: text, sender_id: user?.id }]);
      setText("");

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item?.sender_id === user?.id;
    return (
      <View
        style={{
          width: W(80),
          flexDirection: "row",
          alignItems: "center",
          alignSelf: isUser ? "flex-end" : "flex-start",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginVertical: H(1),
          marginHorizontal: H(2),
        }}
      >
        {isUser ? (
          <>
            {item?.created_at && (
              <Text
                style={{
                  color: Grey,
                  fontSize: 10,
                  marginRight: H(1),
                  fontFamily: "Poppins-Regular",
                }}
              >
                {new Date(item?.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            )}
            <Text
              style={{
                color: White,
                backgroundColor: "#CA201C",
                fontSize: 11,
                fontFamily: "Poppins-Regular",
                paddingHorizontal: H(1.5),
                paddingVertical: H(1),
                borderRadius: H(0.5),
              }}
            >
              {item?.message}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={{
                color: White,
                backgroundColor: Blue,
                fontSize: 11,
                fontFamily: "Poppins-Regular",
                paddingHorizontal: H(1.5),
                paddingVertical: H(1),
                borderRadius: H(0.5),
              }}
            >
              {item?.message}
            </Text>
            <Text
              style={{
                color: Grey,
                fontSize: 10,
                marginLeft: H(1),
                fontFamily: "Poppins-Regular",
              }}
            >
              {item?.created_at
                ? new Date(item?.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </Text>
          </>
        )}
      </View>
    );
  };

return (
 <SafeAreaView key={rerenderKey} style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: H(5),
              marginBottom: H(1),
            }}
          >
            <TouchableOpacity
              onPress={() => goBack()}
              style={{
                height: H(4),
                width: W(9),
                borderWidth: H(0.1),
                borderColor: Grey,
                borderRadius: H(0.5),
                marginLeft: H(3),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"arrow-back"} size={22} color={Grey} />
            </TouchableOpacity>
            <Text
              style={{
                color: Black,
                fontSize: 16,
                width: W(64),
                fontFamily: "Poppins-Medium",
                marginLeft: H(2),
                marginTop: H(1),
              }}
            >
              {props?.route?.params?.item?.customer_id
                ? props?.route?.params?.item?.customer_id?.name
                : "Support"}
            </Text>
          </View>

          {/* Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(_, index) => index.toString()}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: H(2), paddingBottom: H(2) }}
            style={{ flex: 1 }}
          />

          {/* Input Field */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: White,
              paddingVertical: H(1),
              paddingHorizontal: H(2),
              // borderTopWidth: 0.5,
              // borderColor: Grey,
            }}
          >
            <View
              style={{
                flex: 1,
                height: H(6),
                backgroundColor: White,
                borderRadius: H(1),
                borderWidth: H(0.1),
                borderColor: Grey,
                justifyContent: "center",
              }}
            >
              <TextInput
                value={text}
                style={{
                  color: Black,
                  paddingHorizontal: H(1.5),
                  fontSize: 13,
                }}
                placeholder="Type here"
                placeholderTextColor={Grey}
                onChangeText={setText}
                returnKeyType="send"
                onSubmitEditing={sendChat}
                onFocus={() => console.log("Focused")}
              />
            </View>

            <TouchableOpacity
              onPress={sendChat}
              style={{
                height: H(6),
                width: W(14),
                backgroundColor: ButtonClr,
                marginLeft: H(1),
                borderRadius: H(1),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name={"send"} size={22} color={White} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

};

export default Chat;
