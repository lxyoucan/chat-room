#hsql是一个内置数据库，方便用于演示。
#启动hsql 服务端 方便调试~/mac/WP2021/idea/chat-room/换成项目位置
java -classpath  ~/mac/WP2021/idea/chat-room/server/database/hsqldb.jar org.hsqldb.Server -database.0 ~/mac/WP2021/idea/chat-room/server/database/.hsqldb/db -dbname.0 xdb
