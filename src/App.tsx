import {useEffect, useRef, useState} from "react";
// @ts-ignore
import vertexShaderSource from './shaders/vertex.glsl'
// @ts-ignore
import fragmentShaderSource from './shaders/fragment.glsl'
function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const errorBoxRef = useRef<HTMLDivElement>(null)
    const errorBoxParagraphRef = useRef<HTMLParagraphElement>(null)
    // const [time,setTime] = useState<number>(0.0)
    
    const showError = (errorMessage: string) => {
        const errorBox = errorBoxRef?.current!
        const paragraph: HTMLParagraphElement = errorBoxParagraphRef?.current!
        paragraph.innerText = errorMessage
        errorBox.appendChild(paragraph)
    }
    
    const drawTriangle = () => {
        const canvas: HTMLCanvasElement = canvasRef?.current!
        const gl: WebGLRenderingContextBase = canvas?.getContext('webgl2')!
        
        canvas.width = canvas.clientWidth / 1
        canvas.height = canvas.clientHeight / 1
        gl.viewport(0.,0.,canvas.width,canvas.height)
        
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        const positions = [
            1., 1.,
            -1., 1.,
            1., -1.,
            -1., -1.
        ]
        // @ts-ignore
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
        
        
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vertexShader, vertexShaderSource)
        gl.compileShader(vertexShader)
        
        
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(fragmentShader, fragmentShaderSource)
        gl.compileShader(fragmentShader)
        
        const program = gl.createProgram()!
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.useProgram(program)
        
        const positionAttributeLocation = gl.getAttribLocation(program, 'vertexPosition')
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.vertexAttribPointer(
            positionAttributeLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        )
        
        const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution')!
        const timeUniformLocation = gl.getUniformLocation(program,'iTime')!
        
        let time = 0.0;
        gl.uniform1f(timeUniformLocation,time)
        
         const frame = function () {
            time += 0.01
            gl.uniform1f(timeUniformLocation,time)
            
            gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)
            
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
             requestAnimationFrame(frame)
        };
        requestAnimationFrame(frame)
    }
    
    useEffect( () => {
        showError('')
        
        try {
            drawTriangle()
        } catch (e: any) {
            
            showError(e.message)
        }
        
        
        
    }, [canvasRef]);

    return(
        <main>
            <canvas ref={canvasRef}></canvas>
            <div className='errorbox' ref={errorBoxRef}>
                <p ref={errorBoxParagraphRef}></p>
            </div>
        </main>
    )
}

export default App
