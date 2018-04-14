import immutable, { isImmutable } from 'immutable'
import config from '../config'
import setNotification from '../util/setNotification'

const initState = immutable.fromJS({
  messageList: [],
  roomList: [],
  curSelectedRoom: {}
});

export function user(state = initState, action) {
  switch (action.type) {

    case 'setRoomsAndMessagesList': {
      let messageList = []
      let roomList = []
      for(let room of action.data) {
        messageList.push({
          roomId: room.id,
          messages: [],
          isTop: false
        });
        roomList.push(Object.assign(room, { unread: 0}))
      }
      return state.set('messageList', immutable.fromJS(messageList))
                  .set('roomList', immutable.fromJS(roomList))
    }

    case 'addUser': {
      return state.updateIn(
        ['roomList'], 
        roomList => {
          const roomIndex = roomList.findIndex(g => g.get('id') === action.roomId)
          if (roomList.getIn([roomIndex, 'onlineUsers'])) {
            return roomList.updateIn([roomIndex, 'onlineUsers'], m => {
              let userIndex = m.findIndex(user => user.get('id') === action.user.id)
              if (userIndex === -1) {
                return m.push(immutable.fromJS(action.user))
              }
              return m;
            })
          } else {
            return roomList
          }
        }
      ).updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          if(messageList.get([roomIndex, 'messages'])) {
            return messageList.updateIn([roomIndex, 'messages'], m => m.push(immutable.fromJS({
              msgType: 'TIPS_MESSAGE',
              data: action.data
            })))
          } else {
            return messageList;
          }
        }
      )
    }

    // 初始化获取群信息
    case 'getRoomMessage': {
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          return messageList.updateIn(
            [roomIndex, 'messages'],
            messages => immutable.fromJS(action.data.data)
          )
        }
      )
    }

    // 滚动获取历史信息
    case 'getHistoryMessage': {
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.roomId)
          console.log('action.data.data.length', action.data.data.length)
          if (action.data.data.length === 0) {
            return messageList.updateIn(
              [roomIndex, 'isTop'],
              isTop => isTop = true
            )
          } else {
            return messageList.updateIn(
              [roomIndex, 'messages'],
              messages => immutable.fromJS(action.data.data).concat(messages)
            ) 
          }
        }
      );
    }

    // 接信息
    case 'getMessage': {
      const curSelectId = state.get('curSelectedRoom').get('id')
      if (action.data.From.id !== config.user.id && config.desktopNotification) {
        setNotification(action.data)
      }
      return state.updateIn(
        ['messageList'],
        messageList => {
          const roomIndex = messageList.findIndex(g => g.get('roomId') === action.data.roomId);
          return messageList.updateIn(
            [roomIndex, 'messages'],
            m => m.push(immutable.fromJS(action.data))
          )
        }
      ).updateIn(
        ['roomList'], 
        roomList => {
          const roomIndex = roomList.findIndex(g => g.get('id') === action.data.roomId);
          return roomList.updateIn(
            [roomIndex, 'unread'],
            unread => (!curSelectId || curSelectId !== action.data.roomId)? unread+=1 : unread
          ).updateIn(
            [roomIndex, 'lastMessage'],
            lastMessage => lastMessage = `${action.data.From.name}: ${action.data.content}`
          )
        }
      )
    }

    case 'setCurRoom': {
      let roomList = state.get('roomList')
      const roomIndex = roomList.findIndex(g => g.get('id') === action.data)
      return state.updateIn(
        ['roomList'],
        roomList => roomList.updateIn(
          [roomIndex, 'unread'],
          unread => unread = 0
        )
      ).set('curSelectedRoom', roomList.get(roomIndex))

    }

    
    case 'createRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.unshift(immutable.fromJS(Object.assign(action.data.data, {onlineUsers: []})))
      )
    }

    case 'joinRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.unshift(immutable.fromJS(Object.assign(action.data.data)))
      )
    }

    case 'ownLeaveRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => roomList.delete(roomList.findIndex(room => room.get('id') === action.roomId))
      ).updateIn(
        ['messageList'],
        messageList => messageList.delete(messageList.findIndex(g => g.get('roomId') === action.roomId))
      )
    }

    case 'otherLeaveRoom': {
      return state.updateIn(
        ['roomList'],
        roomList => {
          let roomIndex = roomList.findIndex(room => room.get('id') === action.roomId)
          if (roomIndex !== -1) {
            return roomList.updateIn(
              [roomIndex, 'onlineUsers'],
              onlineUsers => onlineUsers.delete(onlineUsers.findIndex(g => g.get('id') === action.userId))
            )
          }
          return roomList;
        }
      )
    }

    case 'userLeave': {
      return state.updateIn(
        ['messageList'],
        messageList => messageList.map((item, index) => {
          return item.updateIn(['messages'], messages => messages.push(immutable.fromJS({
            msgType: 'TIPS_MESSAGE',
            data: action.data
          })))
        })
      ).updateIn(
        ['roomList'],
        roomList => roomList.map((room, index) => {
          return room.updateIn(['onlineUsers'], 
            onlineUsers => onlineUsers.delete(onlineUsers.findIndex(user => user.get('id') === action.data.userId))
          )
        })
      )
    }

    default:
      return state;
  }
}
