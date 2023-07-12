import { Component } from '@angular/core';
import { fabric } from "fabric";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fabric-learning';
  canvas:any;
  line:any;
  mouseDown:boolean=false
 
  ngOnInit(){
  this.canvas = new fabric.Canvas('canv',{
    width:window.innerWidth,
    height:window.innerHeight
  })
 
  }



  linesclick(){
this.canvas.selection = false
this.canvas.hoverCursor = 'auto'

    this.canvas.on('mouse:down', (o:any)=>{
      this.mouseDown=true;
      let pointer = this.canvas.getPointer(o?.e);
      this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
       
        stroke:'red',
        strokeWidth:3,
        selectable:false,
 
        
      })

      this.canvas.add(this.line)
      this.canvas.requestRenderAll();

    })


    this.canvas.on('mouse:move', (o:any)=>{

      if(this.mouseDown){
        let pointer = this.canvas.getPointer(o?.e);
        this.line?.set({
          x2:pointer.x,
          y2:pointer.y
        })

        this.canvas.requestRenderAll()

      }

    })

    this.canvas.on('mouse:up', ()=>{
      this.line.setCoords()
      this.mouseDown=false
    })



    
  }


  deactivate(){
    this.canvas.off('mouse:down')
    this.canvas.off('mouse:move')
    this.canvas.off('mouse:up')
  }




}
