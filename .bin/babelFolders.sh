#!/bin/dash


compileDir () {
    for d in $1; do
        echo $d
        case $d in 
            *.ts)
                # $a="publish"
                # echo $d
                a="${d//'src'/'publish'}"
                a=${a//".ts"/'.js'}
                ../node_modules/.bin/babel $d --out-file $a 
                # echo $a
                ;;
            *)
                echo $d
                compileDir "$d/*"
                ;;
        esac
    done
}

compileDir "../src/*"


# ../src/*