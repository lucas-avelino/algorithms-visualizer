#!/bin/dash
compileDir () {
    for d in $1; do
        case $d in 
            *.ts)
                echo $d
                a="${d//'src'/'publish'}"
                a=${a//".ts"/'.js'}
                ./node_modules/.bin/babel $d --out-file $a --extensions
                ;;
            *)
                compileDir "$d/*"
                ;;
        esac
    done
}

compileDir "./src/*"