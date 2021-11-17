echo '=========== Server ==========='
npm run build
echo '=========== Client ==========='
cd client
npm run build
echo '=========== ZIP ==========='
zip -r9 crng.zip dist/ public/ package.json
echo '=========== MOVE TO SERVER ==========='
scp crng.zip oleg@159.89.24.192:/home/oleg/carnegie
scp app.dev.json oleg@159.89.24.192:/home/oleg/carnegie
scp ecosystem.json oleg@159.89.24.192:/home/oleg/carnegie

CMD='
SRC=/home/oleg/carnegie;
DEST=/opt/crng;

cd $SRC;
unzip -oq crng.zip -d $DEST;

cd $DEST;
npm i;
'

ssh -t oleg@159.89.24.192 $CMD
