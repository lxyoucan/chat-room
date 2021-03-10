package com.itkey.chatroom.utils;

public class Test {
  public static void main(String[] args) {
    System.out.println("hello world");
    System.out.println("hello world");
    System.out.println("hello world");

    // 智能提示演示
    System.out.println("完全跟ide一样");
    String str = "123456789";
    // 对象方法提示正常
    System.out.println(str.substring(0, 3));
    // 那么自己写的类提示如何呢？
    // 在我的spring 项目中看吧：
    // 我平时更多的用于写一些java小程序，单文件的或者少文件的
    // 来个for
    for (int i = 0; i <= 10; i++) {
      System.out.println("用vim写java 代码效果如何？" + i);
    }

    // 代码格式化演示
    String str2g = "32432432432432";
    str2g = str2g.substring(0,4);
    System.out.println(str2g);


  }
}
