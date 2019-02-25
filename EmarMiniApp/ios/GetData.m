//
//  GetData.m
//  ErnRunner
//
//  Created by Manoj Sharma on 23/02/19.
//  Copyright © 2019 Walmart. All rights reserved.
//

#import "GetData.h"

static DBManager *sharedInstance = nil;
static sqlite3 *database = nil;
static sqlite3_stmt *statement = nil;

@implementation GetData
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(getThing,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
    NSString *docsDir;
    NSString *databasePath;
    NSArray *dirPaths;
    NSString *thingToReturn = @"Hello World!";
    
    dirPaths = NSSearchPathForDirectoriesInDomains
    (NSDocumentDirectory, NSUserDomainMask, YES);
    docsDir = dirPaths[0];
    
    databasePath = [[NSString alloc] initWithString:
                    [docsDir stringByAppendingPathComponent: @"student.db"]];
    BOOL isSuccess = YES;
    NSFileManager *filemgr = [NSFileManager defaultManager];
    
    //if ([filemgr fileExistsAtPath: databasePath ] == NO) {
        const char *dbpath = [databasePath UTF8String];
        if (sqlite3_open(dbpath, &database) == SQLITE_OK) {
            char *errMsg;
            const char *sql_stmt ="create table if not exists studentsDetail (regno integer primary key, name text, department text, year text)";
           
            if (sqlite3_exec(database, sql_stmt, NULL, NULL, &errMsg) == SQLITE_OK) {
                sqlite3_stmt *statement;
                NSString *sql_insert =@ "INSERT INTO studentsDetail (regno, name, department, year) VALUES (200, 'Ankit' , 'Dev', '2019')";
                const char *insert_stmt1 = [sql_insert UTF8String];
                NSInteger result = sqlite3_prepare_v2(database,insert_stmt1, -1, &statement, NULL);
                if(!result){
                    sqlite3_stmt *cmpStmt;
                    NSString *querySQL = @"SELECT COUNT(*) FROM STUDENTSDETAIL";
                     const char *insert_stmt = [querySQL UTF8String];
                    int res = sqlite3_prepare_v2(database, insert_stmt, -1, &cmpStmt, NULL);
                    if ( res == SQLITE_OK) {
                        
                        while (sqlite3_step(cmpStmt) == SQLITE_ROW)
                {
                             int id1 = sqlite3_column_int(cmpStmt, 0);
                    
                        }
                        
                isSuccess = NO;
                thingToReturn =@"Failed to create table";
                NSLog(@"Failed to create table");
            }
           // sqlite3_close(database);
            //return  isSuccess;
        else {
            
                }

                thingToReturn = @"inserted suceessfully";
            }
            else{
                isSuccess = NO;
                thingToReturn=@"Failed to open/create database";
                NSLog(@"Failed to open/create database");
            }
           // (1,'Paul', 32, 'California', 20000.00 );"
            
            
        }
   }
    //}
   // return isSuccess;
    
    resolve(thingToReturn);
}
@end


