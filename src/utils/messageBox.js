import { ElMessageBox } from 'element-plus';
export const message =(title)=>{
    ElMessageBox.confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass:'message',
        type: 'warning'
      }).then(() => {
       
      }).catch(() => {
        
      });
}