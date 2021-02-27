package com.itkey.chatroom.service.impl;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserTotal;
import com.itkey.chatroom.form.UserRegisterForm;
import com.itkey.chatroom.repository.UserRepository;
import com.itkey.chatroom.repository.UserTotalRepository;
import com.itkey.chatroom.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

@Service
@Slf4j
public class LoginServiceImpl {

    @Autowired
    private UserTotalRepository userTotalRepository;

    @Autowired
    private UserRepository userRepository;
    /**
     * 用户注册
     * PS:用户注册功能，在枣庄APP中没有实质的作用，主要是为了应付appstore 审核
     * @param form
     * @return
     */
    @Transactional
    public ResultVO userRegister(UserRegisterForm form){
        if(form==null){
            return ResultVOUtil.error(-1,"无效的表单数据！");
        }
        if(StringUtils.isEmpty(form.getUserId())){
            return ResultVOUtil.error(-2,"账号不能为空！");
        }

        if(StringUtils.isEmpty(form.getPassword())){
            return ResultVOUtil.error(-3,"密码不能为空！");
        }
        if(StringUtils.isEmpty(form.getName())){
            return ResultVOUtil.error(-4,"姓名不能为空！");
        }

        int userIdLength = form.getUserId().length();
        if(userIdLength>50){
            return ResultVOUtil.error(-5,"账号长度不能大于50，当前长度是："+userIdLength);
        }
        if(userIdLength<5){
            return ResultVOUtil.error(-6,"账号长度不能小于5，当前长度是："+userIdLength);
        }

        int passwordLength = form.getPassword().length();
        if(passwordLength<6){
            return ResultVOUtil.error(-7,"密码长度不能小于6，当前长度是："+passwordLength);
        }
        if(passwordLength>=30){
            return ResultVOUtil.error(-8,"密码长度不能大于30，当前长度是："+passwordLength);
        }

        int nameLength = form.getName().length();
        if(nameLength>30){
            return ResultVOUtil.error(-9,"姓名长度不能大于30，当前长度是："+nameLength);
        }

        //上面是最基础的校验
        //校验一下账号是否已经存在
        int userCount = userTotalRepository.countByUserId(form.getUserId());
        if(userCount>=1){
            return ResultVOUtil.error(-10,"账号："+form.getUserId()+"已经存在，换个账号称试试吧！");
        }

        /**校验通过了，准备创建用户数据吧！！！**/

        //1.新增用户数据tuser
        UserTotal user = new UserTotal();
        user.setUserId(form.getUserId());
        user.setName(form.getName());
        if(!StringUtils.hasText(user.getAvatar())){
            user.setAvatar("https://img-blog.csdnimg.cn/20210227171154880.png");
        }
        //转成md5保存
        String md5Password = DigestUtils.md5DigestAsHex(form.getPassword().getBytes());
        user.setPassword(md5Password);
        userTotalRepository.save(user);

        return ResultVOUtil.success("注册成功！");
    }

    /**
     * 根据聊天室ID 查询聊天列表
     * @param userId
     * @return
     */
    public ResultVO userQuery(String userId){
        if(userId==null||StringUtils.isEmpty(userId)){
            ResultVOUtil.error(-1,"userId为空！");
        }
        User user = userRepository.queryByUserId(userId);
        if(user==null){
            ResultVOUtil.error(-2,"userid:"+userId+"查无记录！");
        }
        //return messageRepository.queryByRoomIdOrderByCreatedAtAsc(roomId);
        return ResultVOUtil.success(user);
    }
}
