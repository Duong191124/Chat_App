const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    socket.on("join-room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("send-message", (data) => {
      const { roomId, message } = data;
      io.to(roomId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocket;
