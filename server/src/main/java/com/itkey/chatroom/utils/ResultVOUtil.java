package com.itkey.chatroom.utils;


import com.itkey.chatroom.VO.PageVO;
import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.enums.ResultEnum;
import org.springframework.data.domain.Page;

/**
 * 2018年5月22日 10:39:20
 */
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResultVOUtil {
    public static ResultVO success(Object object) {
        ResultVO resultVO = new ResultVO();
        resultVO.setData(object);
        resultVO.setCode(0);
        resultVO.setMsg("success");
        return resultVO;
    }

    public static ResultVO success() {
        ResultVO resultVO = new ResultVO();
        resultVO.setData(null);
        resultVO.setCode(0);
        resultVO.setMsg("成功");
        return resultVO;
    }


    public static ResultVO error(Integer code,String msg) {
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(code);
        resultVO.setMsg(msg);
        return resultVO;
    }

    public static ResultVO error(ResultEnum resultEnum) {
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(resultEnum.getCode());
        resultVO.setMsg(resultEnum.getMessage());
        return resultVO;
    }

    public static PageVO page(Page page) {
        PageVO pageVO = new PageVO();
        if(page!=null){
            pageVO.setCode(0);
            pageVO.setSuccess(Boolean.TRUE);
            //数据体
            pageVO.setData(page.getContent());
            //当前页数
            pageVO.setCurrent(page.getNumber());
            //总条数
            pageVO.setTotal(page.getTotalElements());
            //每页条数
            pageVO.setPageSize(page.getSize());
        }else {
            pageVO.setCode(-1);
            pageVO.setSuccess(Boolean.FALSE);
        }


        return pageVO;
    }
}
