// 域名地址(项目实地址)
const Host = 'wss://jfkhjoidjf.ltd/api/websocket/';
 
// Socket连接成功
var socketOpen = false;
// Socket关闭
var socketClose = false;
// 消息队列
var socketMsgQueue = [];
 
// 判断心跳变量
var heart = null;
// 心跳失败次数
var heartBeatFailCount = 0;
// 终止心跳
var heartBeatTimeout = null;
// 终止重连
var connectSocketTimeout = null;
 
var webSocket = {
    // 连接Socket
    connectSocket:function(options) {
        wx.showLoading({
            title: '正在连接Socket',
            mask: true,
        });
        socketOpen = false;
        socketClose = false;
        socketMsgQueue = [];
        wx.connectSocket({
            url:Host+options.data.roomId+'/'+options.data.userId,
            success:function(res) {
                if (options) {
                    options.success && options.success(res);
                }
            },
            fail:function(res) {
                if (options) {
                    options.fail && options.fail(res);
                }
            }
        })
    },
    // 发送消息
    sendSocketMessage:function(options) {
        if (socketOpen) {
            wx.sendSocketMessage({
                data: typeof options.data === "object"?JSON.stringify(options.data) : options.data,
                success: function(res) {
                    if (options) {
                        options.success && options.success(res);
                    }
                },
                fail: function(res) {
                    if (options) {
                        options.fail && options.fail(res);
                    }
                }
            })
        } else {
            socketMsgQueue.push(options.msg)
        }
    },
    // 关闭Socket
    closeSocket: function(options) {
        if (connectSocketTimeout) {
            clearTimeout(connectSocketTimeout);
            connectSocketTimeout = null;
        };
        socketClose = true;
        this.stopHeartBeat();
        wx.closeSocket({
            success: function(res) {
                if (options) {
                    options.success && options.success(res);
                }
            },
            fail: function(res) {
                if (options) {
                    options.fail && options.fail(res);
                }
            }
        })
    },
    // 收到消息
    onSocketMessageCallback: function(msg) {},
 
    // 开始心跳
    startHeartBeat: function() {
        heart = true;
        this.heartBeat();
    },
 
    // 正在心跳
    heartBeat: function() {
        var that = this;
        if (!heart) {
            return;
        };
        that.sendSocketMessage({
            data: 'HEARTBEAT',
            success: function(res) {
                if (heart) {
                    heartBeatTimeout = setTimeout(() => {
                        that.heartBeat();
                    }, 7000);
                }
            },
            fail: function(res) {
                if (heartBeatFailCount > 2) {
                    that.connectSocket();
                };
                if (heart) {
                    heartBeatTimeout = setTimeout(() => {
                        that.heartBeat();
                    }, 7000);
                };
                heartBeatFailCount++;
            },
        });
    },
 
    // 结束心跳
    stopHeartBeat: function() {
        heart = false;
        if (heartBeatTimeout) {
            clearTimeout(heartBeatTimeout);
            heartBeatTimeout = null;
        };
        if (connectSocketTimeout) {
            clearTimeout(connectSocketTimeout);
            connectSocketTimeout = null;
        }
    }
};
 
// 监听WebSocket打开连接
wx.onSocketOpen(function(res) {
    wx.hideLoading();
    // 如果已经关闭socket
    if (socketClose) {
        webSocket.closeSocket();
    } else {
        socketOpen = true
        for (var i = 0; i < socketMsgQueue.length; i++) {
            webSocket.sendSocketMessage(socketMsgQueue[i])
        };
        socketMsgQueue = []
        webSocket.startHeartBeat();
    }
});
 
// 监听WebSocket错误
wx.onSocketError(function(res) {
    console.log('WebSocket连接打开失败，请检查！', res);
});
// 监听WebSocket接受到服务器的消息
wx.onSocketMessage(function(res) {
  
    webSocket.onSocketMessageCallback(JSON.parse(res.data));
});
 
// 监听WebSocket关闭连接后马上重连
wx.onSocketClose(function(res) {
    if (!socketClose) {
        clearTimeout(connectSocketTimeout);
        connectSocketTimeout = setTimeout(() => {
            webSocket.connectSocket();
        }, 3000);
    }
});
 
module.exports = webSocket;