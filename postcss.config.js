/**
 *@author Create by zhoulujun.cn on 1/7/192:59 PM
 *@version 1.0.0
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "> 1%",
                "last 105 versions",
                "not ie <= 8",
                "ios >= 8",
                "android >= 4.0"
            ]
        })
    ]
};